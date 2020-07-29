import React, { useRef,useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { searchLogs, clearSearch } from '../../actions/logActions'

const SearchBar = ({ log: { logs, filtered }, searchLogs, clearSearch }) => {

    const text = useRef('')

    useEffect(() => {
        if(filtered === null){
            text.current.value =''
        }
        //eslint-disable-next-line
    },[])

    const onChange = (e) => {
        if (text.current.value !== ''){
            searchLogs(e.target.value) 
        }else{
            clearSearch()
        }
    }
    const onClick = () => {
        if (text.current.value !== ''){
          clearSearch()
        }
 
    }

    return (
        <nav style={{ marginBottom: '30px' }} className="blue">
            <div className="nav-wrapper">
                <form>
                    <div className="input-field">
                        <input id="search" type="search" placeholder='Search Logs...'  ref={text}  onChange={onChange} />
                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        <i className="material-icons" onClick={onClick}>close</i>
                    </div>
                </form>
            </div>
      </nav>
    )
}

const mapStateToProps = state => ({
    log: state.log    //assign state.log ( from log:logReducer) to component prop named log
})

SearchBar.propTypes = {
    log: PropTypes.object.isRequired,
    searchLogs: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
}

export default connect (mapStateToProps, { searchLogs, clearSearch })(SearchBar)

