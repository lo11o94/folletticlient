import React, { Component, useState, useEffect } from "react";
import { Button, Row, Typography } from 'antd';
import io from "socket.io-client";

const { Text } = Typography;

var usernames = [
    "lollino94", "giorgina03", "davidinorosso92", "elmaco94", "machostanza93", "sarettafashion93",
    "bubusettete91", "cecigiova94", "tarozzinojohndeere93", "casonadi93", "anninapulcina19",
    "rikymaxxari92", "yuppiemarty94", "taniettabulletta93", "alfajack90"
]

let socket;
let extraction;

function FollettiClient({username}) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [extractions, setExtractions] = useState('');
    const ENDPOINT = "https://follettiserver.herokuapp.com/";

    useEffect(() => {
        const name = username
        const room = "FOLLETTI-room"
        socket = io.connect(ENDPOINT);

        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                console.log(error);
            }
        });
    }, []);

    useEffect(() => {
        socket.on("members", ({ users }) => {
            setUsers(users);
        });
    }, []);

    useEffect(() => {
        socket.on("extractions", ({ extractions }) => {
            setExtractions(extractions);
            extraction = extractions[window.history.state.state.username]
        });
    }, []);

    const Users = (users) => {
        let usernames = []

        Array.from(users).map(user => {
            usernames.push(
                <Row style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    <Text style={{color: "green"}}>{user.name}</Text>
                </Row>
            )
        })

        return usernames
    }

    return (
        <div>
            {
                users.length > 0 == true ?
                    Users(users)
                :
                    <Text style={{color: "red"}}>Login già effettuato.</Text>
            }
        </div>
    );
}

class Extract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            extracted: "",
            enable: false,
        }
    }

    componentWillUnmount() {
        socket.disconnect();
    }

    componentDidMount() {
        window.scrollTo(0,0);
        if(usernames.includes(window.history.state.state.username)) {
            this.setState({
                username: window.history.state.state.username,
                enable: true
            }, () => {

            })
        }
    }

    handleClickExtract = () => {
        this.setState({
            extracted: extraction
        })
    }

    render() {
        document.title = 'FOLLETTI'
        return (
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            {
                this.state.enable == true ?
                    <div style={{display: 'flex', justifyContent: 'center', width: '20%'}}>
                        <div style={{display: 'flex', flexDirection: "column", justifyContent: 'center'}}>
                            <Row style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: 25}}>
                                <Text style={{fontWeight: "bold"}}>{this.state.username}</Text>
                            </Row>
                            <Row style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: 25}}>
                                <Text>Attualmente nella stanza:</Text>
                            </Row>
                            <Row style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: 25}}>
                                <FollettiClient username={this.state.username}/>
                            </Row>
                            <Row style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: 25}}>
                                <Button type="primary" onClick={this.handleClickExtract}>
                                    Estrai
                                </Button>
                            </Row>
                            <Row style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: 25}}>
                                <Text>{this.state.extracted}</Text>
                            </Row>
                        </div>
                    </div>
                :
                    "WRONG USERNAME"
            }
            </div>
        );
    }
}

export default Extract;
