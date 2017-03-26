import React from 'react'

const GitRepoItem = ({ repo }) => {
  return (
    <div className="column">
      <div className="box box--github">
        <div className="media">
          <div className="media-content">
            <div className="content">
              <a href={repo.html_url} alt={repo.full_name}>{repo.full_name}</a>
              <br />
              <p>{repo.description}</p>
            </div>
          </div>
        </div>
        <br />
        <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item" href={repo.stargazers_url}>
                <span className="icon is-small"><i className="fa fa-star"></i></span> <span className="icon-label">{repo.stargazers_count}</span>
              </a>

              <a className="level-item" href={repo.subscribers_url}>
                <span className="icon is-small"><i className="fa fa-eye"></i></span> <span className="icon-label">{repo.watchers_count}</span>
              </a>
            </div>
          </nav>
      </div>
    </div>
  )
}

const ProfileGithubList = ({ repos }) => {
  return (
    <div className="columns">
      { repos.length > 0 
      ? repos.map(repo => <GitRepoItem repo={repo} key={repo.id} />)
      : <div className="column"><p>Unfortunately, this user has no repositories on github. :(</p></div> }
    </div>
  )
}

export default ProfileGithubList