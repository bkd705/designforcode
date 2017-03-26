import React from 'react'

const DribbleProject = ({ shot }) => {
  console.log(shot)
  const filterDescription = (desc) => {
    let newDesc = desc.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br \/>/g, '')
    if (newDesc.length > 140) {
      return newDesc.split('').slice(0, 140).join('') + '...'
    }

    return newDesc
  }

  return (
    <div className="column">
      <div className="box box--dribbble">
        <div className="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <img src={shot.images.teaser} alt={shot.title} className="image--dribbble" />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <a href={shot.html_url} alt={shot.title}>{shot.title}</a>
              <br />
              <p>{filterDescription(shot.description)}</p>
            </div>
          </div>
        </div>
        <br />
        <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item" href={shot.likes_url}>
                <span className="icon is-small"><i className="fa fa-thumbs-o-up"></i></span><span className="icon-label">{shot.likes_count}</span>
              </a>
            </div>
          </nav>
      </div>
    </div>
  )
}

const ProfileDribbbleList = ({ shots }) => {
  return (
    <div className="columns">
      { shots.length > 0
      ? shots.map(shot => <DribbleProject shot={shot} key={shot.id} />)
      : <div className="column"><p>Unfortunately, this user has no projects on Dribbble. :(</p></div> }
    </div>
  )
}

export default ProfileDribbbleList
