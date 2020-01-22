import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import moments from "../moments"

export default class Post extends React.Component {

  render() {
    const header = src => {
      return <img alt="Card" src={src} />;
    };
    const footer = post => (
      <span>
        <Button
          style={{ margin: "2px" }}
          onClick={this.props.mensajero.bind(this, post)}
          label="editar"
          icon="pi pi-pencil"
        />
        <Button
          onClick={this.props.eliminar.bind(this,post.id)}
          label="eliminar"
          icon="pi pi-trash"
          className="p-button-danger"
        />
      </span>
    );
    return (
      <Card
        title={this.props.post.title}
        subTitle="Descripcion"
        style={{ width: "260px", display: "inline-block" ,margin: "5px" }}
        className="ui-card-shadow"
        header={header(this.props.post.image_url)}
        footer={footer(this.props.post)}
      >
        <div>{this.props.post.description} <br/> {moments(this.props.post.created_at).format("MMMM Do YYYY, h:mm A")}</div>
      </Card>
    );
  }
}
