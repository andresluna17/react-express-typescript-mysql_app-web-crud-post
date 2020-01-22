import React from "react";
import "./App.css";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Post from "./components/post.jsx";
import From from "./components/from";
import moments from "./moments";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends React.Component {
  state = {
    eventos: []
  };

  constructor() {
    super();
    this.prueba = this.prueba.bind(this);
  }
  componentDidMount() {
    this.prueba();
  }

  mensajero = post => {
    post.edit = true;
    this.setState({ post: post });
  };
  submit = async post => {
    console.log(post);
    let edit = post.edit;
    delete post.edit;
    let res = await axios({
      method: edit ? "PUT" : "POST",
      url: edit
        ? "http://localhost:5000/posts/" + post.id
        : "http://localhost:5000/posts",
      data: post
    });
    let data = res.data;
    console.log(data);
    this.prueba();
    delete this.state.post;
    const Foo = () => (
      <div>
        <i className="pi pi-check">  {data.message}</i>
      </div>
    );
    toast.success(<Foo />);
  };

  elimnar = async id => {
    let res = await axios({
      method: "delete",
      url: "http://localhost:5000/posts/" + id
    });
    let data = res.data;
    console.log(data);
    this.prueba();
    const Foo = () => (
      <div>
        <i className="pi pi-check">  {data.message}</i>
      </div>
    );
    toast.success(<Foo />);
  };

  async prueba() {
    let res = await axios({
      method: "get",
      url: "http://localhost:5000/posts"
    });
    let data = res.data;
    this.setState({ eventos: data });

    return console.log(data);
    //let a = this.state.eventos.filter(e => e.eveId === "1");
    //console.log(moment( a[0].eveFecha).format("MMMM Do YYYY, h:m A"));
  }
  brandTemplate(rowData) {
    return <img src={rowData.image_url} alt={rowData.title} width="48px" />;
  }

  convertiondate(rowData) {
    return <p>{moments(rowData.created_at).format("MMMM Do YYYY, h:mm A")}</p>;
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col from">
            <From
              recargar={this.prueba}
              post={this.state.post}
              enviar={this.submit}
            />
          </div>
          <div className="col">
            <ToastContainer />

            <h1 style={{ textAlign: "center" }}>posts existentes</h1>
            <div className="content-section implementation">
              <DataTable value={this.state.eventos} paginator={true} rows={10}>
                <Column field="title" header="titulo" />
                <Column field="description" header="descripcion" />
                <Column
                  header="imagen"
                  body={this.brandTemplate}
                  style={{ textAlign: "center" }}
                />
                <Column
                  field="created_at"
                  body={this.convertiondate}
                  header="fecha"
                />
              </DataTable>
              <br />
              {this.state.eventos.map(e => {
                return (
                  <Post
                    post={e}
                    key={e.id}
                    eliminar={this.elimnar}
                    mensajero={this.mensajero}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
