import React from "react";

export default class From extends React.Component {
  state = {
    title: "",
    description: "",
    image_url: "",
    edit: false
  };

  componentWillReceiveProps(next_props) {
    if(next_props){
      this.setState(next_props.post);
    }
    console.log(this.state);
  }

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  submit = e => {
    e.preventDefault();
    this.props.enviar(this.state);
    this.setState({
      title: "",
      description: "",
      image_url: ""
    });
  };

  limpiar() {
    this.setState({ title: "", description: "", image_url: "", edit: false });
  }
  render() {
    return (
      <div className="col-sm">
        {this.state.edit ? <h1>edita el post</h1> : <h1>creacion de post</h1>}
        <form onSubmit={this.submit}>
          <div className="form-group">
            <input
              className="form-control form2"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.changeHandler}
              required
            />
            <textarea
              className="form-control form2"
              name="description"
              value={this.state.description}
              onChange={this.changeHandler}
              required
            />
            <input
              className="form-control form2"
              type="text"
              name="image_url"
              value={this.state.image_url}
              onChange={this.changeHandler}
              required
            />
            <input type="submit" className="btn btn-primary buttom" />
            {this.state.edit && (
              <button type="button" className="btn btn-dark" style={{margin:"5px"}} onClick={this.limpiar.bind(this)}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}
