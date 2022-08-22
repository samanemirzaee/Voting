import { Web3Context } from '../context';
import { useContext, useState } from 'react';
import './condidateList.css'
import { Col, Toast, ToastContainer } from "react-bootstrap"


const CondidateList = (props) => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [show, setShow] = useState(false);
    const [showTwo, setShowTwo] = useState(false);
    const [message, setMessage] = useState("");

    function myselect() {
        let id = props.id;
        if (web3States.account) {
            web3States.contract.methods.vote(id).send({ from: web3States.account }).then(res => {
                console.log(res)
                setMessage("رای شما با موفقیت ثبت شد")
                setShowTwo(true)
            }).catch(err => {
                console.log(err)
                setMessage("فقط یکبار می توانید رای دهید")
                setShow(true)
            })
        } else {
            setMessage("ابتدا به کیف پول خود وصل شوید")
            setShow(true)
        }
    }
    return (
        <>
            <Col xs={6}>
                <ToastContainer className="p-3" position="top-center">
                    <Toast onClose={() => setShow(false)}
                        show={show} delay={5000} autohide>
                        <Toast.Header className="text-white bg-danger">
                            <strong className="ms-auto">خطا</strong>
                        </Toast.Header>
                        <Toast.Body className="bg-light">{message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
            <Col xs={6}>
                <ToastContainer className="p-3" position="top-center">
                    <Toast onClose={() => setShowTwo(false)}
                        show={showTwo} delay={5000} autohide>
                        <Toast.Header className="text-white bg-success">
                            <strong className="ms-auto">پیام</strong>
                        </Toast.Header>
                        <Toast.Body className="bg-light">{message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>

            <section className="page-section portfolio " onClick={myselect}>
                <div className="container ">
                    <div className="row justify-content-center">
                        <div className="card-inside mx-auto " >
                            <div className="card-inside-caption d-flex justify-content-center align-items-center w-100 h-100" >
                                <div className="card-inside-caption-content text-center text-white">
                                    <i className="fa-regular fa-plus fa-2x" ></i>
                                </div>
                            </div>
                            <p className="text-center my-2">{props.name} </p>
                            <hr style={{color:"rgb(10, 72, 167)"}}/>
                            <p className="text-center my-2">تعداد آرا: {props.voteCount}</p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
export default CondidateList