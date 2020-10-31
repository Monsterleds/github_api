import React from 'react';

import { RequestGithubRepositories } from './../../interfaces';

import './styles.css';

const RepositoriesContainer: React.FC<Omit<RequestGithubRepositories, 'id'>> = ({ html_url, name, description }) => (
  <a href={html_url} target="_blank" rel="noreferrer" className="RepositoriesContainer">
    <div>
      <h3>{name}</h3>
      <span>{description}</span>
    </div>
  </a>
);

export default RepositoriesContainer;