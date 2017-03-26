import React from 'react'

const DribbleProject = ({ project }) => {
  return (
    <div className="column">
      <div className="box box--github">
        <div className="media">
          <div className="media-content">
            <div className="content">
              <a href="#" alt={project.full_name}>{project.name}</a>
              <br />
              <p>{project.description}</p>
            </div>
          </div>
        </div>
        <br />
        <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small"><i className="fa fa-star"></i></span> <span className="icon-label">{project.shots_count}</span>
              </a>
            </div>
          </nav>
      </div>
    </div>
  )
}

const DribbbleProjectList = ({ projects }) => {
  return (
    <div className="columns">
      { projects.length > 0
      ? projects.map(project => <DribbleProject project={project} key={project.id} />)
      : <p>Unfortunately, this user has no projects on Dribbble. :(</p> }
    </div>
  )
}

export default DribbbleProjectList
