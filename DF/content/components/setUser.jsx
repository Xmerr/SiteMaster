import { connect } from 'react-redux';
import { setUser } from '../.redux/actions';

class SetUser extends React.Component{
    render() {
        return(
            <div className="SetUser">
                Current User: {this.props.user}
            </div>
        );
    }
}

SetUser.propTypes={
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        set: user => dispatch(setUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUser);