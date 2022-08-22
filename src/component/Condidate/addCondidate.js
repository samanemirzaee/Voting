import React, { useState, useContext } from 'react'
import { Button, Col, Container, Row, Alert } from "react-bootstrap";
import { Web3Context } from '../context';

const AddCondidate = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [name, setName] = useState();
    const [myShowAlert,setMyShowAlert]=useState(false);
    const [myShowMessage,setMyShowMessage]=useState(false);


    const submitForm = () => {

        web3States.contract.methods.AddCondid(name).send({ from: web3States.account }).then(res => {
            console.log(res)
            setMyShowAlert(true)
            document.getElementById("message").classList.remove("d-none")
            document.getElementById("p-message").innerHTML=`افزودن کاندید ${name} با موفقیت انجام شد`
        }).catch(err => {
            document.getElementById("message").classList.remove("d-none")
            document.getElementById("p-message").innerHTML = "تراکنش با خطا مواجه شد"
        })
    }

    return (
        <>
            <Container className='p-5' dir="rtl">
                <Col xs={12}>
                    <h3>
                        افزودن کاندید
                    </h3>
                </Col>
                <Col xs={12} md={6} className="my-4">
                    <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} placeholder='نام کاندید' />
                </Col>
                <Col className='d-flex justify-content-end' md={6}>
                    <Button onClick={submitForm} variant='outline-success'>
                        ثبت 
                    </Button>
                </Col>
                <Col xs={12} md={6} id="message" className='d-none mt-4' >
                    <Alert variant={myShowAlert ? "success" : "danger"} >
                        <p id="p-message"></p>
                    </Alert>
                </Col>
            </Container>
        </>
    );
}

export default AddCondidate