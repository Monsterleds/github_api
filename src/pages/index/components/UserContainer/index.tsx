import React from 'react';

import { RequestGithubUser } from './../../interfaces';

import './styles.css';

const UserContainer: React.FC<RequestGithubUser> = ({ location, name, bio, avatar_url, public_repos, login, followers, following }) => (
  <div className="UserContainer">
    <div>
      <span>{location}</span>
      <h3>{name}</h3>
      <p>{bio}</p>
    </div>
    <img src={avatar_url} alt="user_avatar" />
    <div>
      <span>{public_repos} Repositórios públicos</span>
      <h3>{login}</h3>
      <p>{followers} Seguidores</p>
      <p>{following} Seguindo</p>
    </div>
  </div>
);

export default UserContainer;