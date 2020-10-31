import React, { useCallback, useRef, useState } from 'react';

import { RequestGithubRepositories, RequestGithubUser } from './interfaces';

import findVector from './../../assets/icons/findVector.png';

import apiGithub from './../../services/apiGithub';

import Loading from './../../components/Loading';
import UserContainer from './components/UserContainer';
import RepositoriesContainer from './components/RepositoriesContainer';

import './styles.css';

const App:React.FC = () => {
  const [userData, setUserData] = useState({} as RequestGithubUser);
  const [repositories, setRepositories] = useState([] as RequestGithubRepositories[]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const requestUserGithub = useCallback(async (e) => {
    try {
      setUserData({} as RequestGithubUser);
      setRepositories([]);
      setIsLoading(true);
      setError('');

      e.preventDefault();

      const profileName = inputRef.current?.value;

      const { data: githubUser } = await apiGithub.get<RequestGithubUser>(`/${profileName}`);
      const { data: githubRepositories } = await apiGithub.get<RequestGithubRepositories[]>(`/${profileName}/repos`);

      setUserData(githubUser);
      setRepositories(githubRepositories);
    } catch(err) {
      const { status } = err.response;

      if (status === 404) {
        setError('Usuário não encontrado.')
      }
    } finally {
      setIsLoading(false);
    }
  }, [setRepositories, setUserData, setIsLoading, setError]);

  return (
    <div className="Container">
      {isLoading && <Loading />}
      <header>
        <div>
          <h1>Pesquise usuários do github</h1>
          <form onSubmit={requestUserGithub}>
            <div>
              <input ref={inputRef} placeholder="Digite o usuário que deseja pesquisar" />
              <button type="submit">
                <img src={findVector} alt="find_icon" />
              </button>
            </div>
            <span>{error}</span>
          </form>
        </div>
      </header>
      <div className="Content">
        {userData.name &&
          <UserContainer 
            bio={userData.bio}
            name={userData.name}
            login={userData.login}
            location={userData.location}
            followers={userData.followers}
            following={userData.following}
            avatar_url={userData.avatar_url}
            public_repos={userData.public_repos}
          />
        }
        {repositories.map(repository => (
          <RepositoriesContainer
            key={repository.id}
            name={repository.name}
            html_url={repository.html_url}
            description={repository.description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
