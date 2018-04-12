import React,{ Component } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

const Item = (props) => {
    return(
        <div className="card col-3" style={{width:"10rem",margin:"1.5em"}} value={props.keyvalue}>
            <img className="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="image" style={{width:"100%"}}/>
            <div className="card-body">
            <h4 className="card-title">{props.item.title}</h4>
            <p className="card-text">{props.item.body}</p>
            <a href="javascript:void(0)" className="btn btn-primary" onClick={props.comments}>Comments</a>
            </div>
        </div>
    )
}

const List = (props) => {
    return(
        <div className="row">
            {props.list.map((item,i) => <Item key={i} item={item} comments={()=>props.getComments(item.id)}/>)}
        </div>
    )
}


export class Movie extends React.Component{
    state = {
        list : [],
        modal: false,
        comment:[],
        page:1,
        hasMore:true
    }
    
    constructor(props){
        super(props);
        this.getPosts();
        this.toggle = this.toggle.bind(this);
        this.getComments = this.getComments.bind(this);
    }

    getPosts = () =>{
        axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${this.state.page}&_limit=10`)
        .then(res => {
            this.setState({
                list: this.state.list.concat(res.data),
                hasMore:(res.data.length > 0)
            })
        });
    }

    getComments = (id) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(res => {
            this.setState({
                comment:res.data,
                modal: !this.state.modal
              });
        });
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    handleScroll = () =>{
        console.log('called');
        this.setState({
            page:this.state.page + 1
        });
        this.getPosts();
    }

    render(){
        return(
            <InfiniteScroll 
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}
            dataLength={this.state.list.length}
            next={this.handleScroll}>
            <div style={{marginTop: "2.3em"}}>
                <List list={this.state.list} getComments={this.getComments}/>
                <Modal isOpen={this.state.modal} centered={true}>
                    <ModalHeader toggle={this.toggle}>Comments</ModalHeader>
                    <ModalBody style={{ height: '400px','overflowY': 'auto'}}>
                        {this.state.comment.map(e => (
                            <div className="list-group" key={e.id}>
                                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                                    <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{e.email}</h5>
                                    <small>3 days ago</small>
                                    </div>
                                    <p className="mb-1">{e.body}</p>
                                    <small>{e.name}.</small>
                                </a>
                            </div>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
            </InfiniteScroll>
        )
    }
}