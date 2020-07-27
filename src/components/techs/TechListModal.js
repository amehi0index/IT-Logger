import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'materialize-css'
import TechItem from './TechItem'
import PropTypes from 'prop-types'
import { getTechs } from '../../actions/techActions'

const TechListModal = ( { tech: { techs, loading}, getTechs } ) => {

    useEffect(() => {
       getTechs()
        //eslint-disable-next-line
    }, [])

    return (
       <div id="tech-list-modal" className="modal">
           <div className="modal-content">
               <h4>Technician List</h4>
               <ul className="collection">
                   {!loading && techs !== null && techs.map(tech => (
                      <TechItem key={tech.id} tech={tech} />
                   ))}
               </ul>
           </div>

       </div>
    )
}

const mapStateToProps = (state) => ({
    tech: state.tech  // tech is component prop, state.tech is tech: techReducer,
})

TechListModal.propTypes = {
    tech: PropTypes.object.isRequired,
    getTechs: PropTypes.func.isRequired,
}

export default connect (mapStateToProps, {getTechs})(TechListModal)