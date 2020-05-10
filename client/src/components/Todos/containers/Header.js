import { connect } from 'react-redux';
import Header from '../Header';
import { addTodo } from '../../../actions';

export default connect(null, { addTodo })(Header);
