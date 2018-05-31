import React, { Component, PropTypes } from 'react';

import styles from './Edit.css';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.editing || false,
    };
  }

  render() {
    return (
      <div className={`${styles.Edit} ${this.props.className}`}>
        {this.state.editing ? this.renderEdit() : this.renderValue()}
        {this.props.onDelete ? this.renderDelete() : null}
      </div>
    );
  }

  renderEdit() {
    return (
        <input
          className={styles.Input}
          type="text"
          size={this.props.value.length}
          autoFocus={true}
          defaultValue={this.props.value}
          onBlur={this.finishEdit}
          onKeyPress={this.checkEnter}
          placeholder={this.props.placeholder}
        />
    );
  }

  renderValue = () => {
    const { value, onDelete } = this.props;
    return (
        <div
          className={styles.Value}
          onClick={this.onValueClick}
        >
          {value}
        </div>
    );
  }

  renderDelete = () => {
    return (
      <button 
        className={styles.Delete}
        onClick={this.props.onDelete}
      >x</button>
    );
  }

  onValueClick = (e) => {
    this.setState({
      editing: true,
    });
  }

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    const value = e.target.value.trim();
    if (value) {
      if (this.props.onEdit) {
        this.props.onEdit(value);
      }
      this.setState({
        editing: false,
      });
    }
  }
}

Edit.propTypes = {
  value: PropTypes.string,
  onEdit: PropTypes.func,
  onValueClick: PropTypes.func,
  editing: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Edit;
