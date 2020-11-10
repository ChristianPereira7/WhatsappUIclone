import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

import MessageItem from './MessageItem';

import EmojiPicker from 'emoji-picker-react';

export default ({user}) => {

    const body = useRef();

    let recognition = null; //Reconhecimento do audio inicia como nulo

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(SpeechRecognition !== undefined) { // se o mic não funcionar a função não se inicia
        recognition = new SpeechRecognition();
    }
    
    const [ emojiOpen, setEmojiOpen ] = useState(false);

    const [ text, setText ] = useState('');

    const [ listening, setListening ] = useState(false); //Quandoo mic estiver ativado
                                                        // o listening inicia como true e o setListening
                                                        //como false ou seja dois estados diferentes
    
    const [list, setList] = useState([
        {author: 123, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 1234, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 1234, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 1234, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 1234, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 1234, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 1234, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 1234, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 123, body: 'teste teste teste'},
        {author: 1234, body: 'teste teste teste'},
    ]); //Aqui será realizado o campo de texto que será enviado para a tela com
                                        //com um array vazio

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    },  [list]);

    const handleEmojiClick = (e, emojiObject) => {
       setText(text + emojiObject.emoji);
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleMicClick = () => {
        if(recognition !== null){
            recognition.onstart = () => { //Quando começar a gravar o audio dai ativa o estado setListening
                setListening(true); //que se inicia em false 
            }
            recognition.onend = () => { //Quando parar o audio ele volta ao estado de false 
                setListening(false); //e desliga o microfone
            }
            recognition.onresult = (e) => { //Nessa função ele recebe o resultado do audio
                setText(e.results[0][0].transcript); //E pega o primeiro intem do array e transcreve para texto na tela
            }
            recognition.start(); // Começa a escutar o que o microfone captar, antes ele recebe as instruçoes do inicio do if
        }
    }
    
    const handleSendClick = () => {

    } 
    

    return(
        <div className="chatWindow">
            
            <div className="chatWindow--header">

                <div className="chatWindow--headerinfo">
                
                    <img className="chatWindow--avatar" src="https://www.w3schools.com/howto/img_avatar.png"/>
                   
                    <div className="chatWindow--name">Christian Pereira</div>
                
                </div>

                <div className="chatWindow--headerbuttons">

                    <div className="chatWindow--btn">
                    
                        <SearchIcon style={{color: '#919191'}}/>
                    
                    </div>

                    <div className="chatWindow--btn">
                    
                        <AttachFileIcon style={{color: '#919191'}}/>
                    
                    </div>

                    <div className="chatWindow--btn">

                        <MoreVertIcon style={{color: '#919191'}}/>
                    
                    </div>


                </div>

            </div>



            <div ref={body} className="chatWindow--body">

                {list.map((item, key) => //Componente da mensagem
                    <MessageItem  
                     key = {key}
                     data={item} //recebe os items da mensagem e envia para o componente MessageItem
                     user={user}   
                    />
                )}

            </div>



            <div className="chatWindow--emojiarea" style={{ height:emojiOpen ? '200px' : '0px' }}>

                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />

            </div>

               <div className="chatWindow--footer">

                     <div className="chatWindow--pre">

                        <div className="chatWindow--btn" 
                        onClick={handleCloseEmoji} 
                        style={{width: emojiOpen?40:0}}>

                        <CloseIcon style={{color: '#919191'}}/>
                
                         </div>


                <div className="chatWindow--btn" onClick={handleOpenEmoji}>

                        <InsertEmoticonIcon style={{color: emojiOpen ? '#009688' : '#919191'}}/>
                
                </div>



                </div>

                <div className="chatWindow--inputarea">

                    <input className="chatWindow--input"
                    type="text" 
                    placeholder="Digite uma mensagem" 
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    />
                
                </div>


                
                
                <div className="chatWindow--pos">

                    {text === '' &&
                    <div className="chatWindow--btn"
                    onClick={handleMicClick}>

                        <MicIcon style={{color: listening ? '#126ECE' : '#919191'}}/>

                    </div>
                    }

                    { text !== '' &&
                    <div className="chatWindow--btn"
                    onClick={handleSendClick}>

                        <SendIcon style={{color: '#919191'}}/>
                        
                    </div>
                    }
                </div>

            </div>

        </div>
    );

}