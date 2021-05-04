import React, {useState} from 'react';
import {Container, Pantalla, Previa, Actual, Button} from  './styled';


export default function Calculadora(){

    const [valor, setValor] = useState('');
    const [previo, setPrevio] = useState('');
    const [operacion, setOperacion] = useState('');

    const appendValue = (el) => {
        const value = el.target.getAttribute('data');

        if (value === '.' && valor.includes('.')) return; //check un solo ,

        setValor(valor + value); //concatena strings
    }

    const handleDelete = () => {
        setValor(String(valor).slice(0,-1));  //-1 para sacar solo el ultimo
    }

    const limpiar = () => {
        setValor('');
        setPrevio('');
        setOperacion('');
    }

    const elegirOperacion = (el) => {
        if(valor === '') return;
        if(previo !== ''){  //toma en cuenta el valor previo y se computa
            let val = computar();
            setPrevio(val);
        } else {
            setPrevio(valor);
        }
        setValor('');
        setOperacion(el.target.getAttribute('data'));
        
    }

    const computar = () => {
        let resultado;
        let valorPrevio = parseFloat(previo);
        let valorActual = parseFloat(valor);

        if(isNaN(valorPrevio) || isNaN(valorActual)) return; //not a number check

        switch(operacion){
            case '÷':
                resultado = valorPrevio/valorActual;
                break;
            case 'x':
                resultado = valorPrevio*valorActual;
                break;
            case '+':
                resultado = valorPrevio+valorActual;
                break;
            case '-':
                resultado = valorPrevio-valorActual;
                break;
            default:
                return;
        }
        return resultado;
    }

    const igual = () => {
        let val = computar();
        // eslint-disable-next-line
        if(val == undefined || val == null) return;
        setValor(val);
        setPrevio('');
        setOperacion('');
    }

    return(
        <Container>
            <Pantalla>
            <Previa>{previo} {operacion}</Previa>
            <Actual>{valor}</Actual>
            </Pantalla>
            <Button gridSpan={2} control onClick={limpiar}>AC</Button>
            <Button control onClick={handleDelete}>DEL</Button>
            <Button data={'÷'} onClick={elegirOperacion} operation>÷</Button>
            <Button data={'7'} onClick={appendValue}>7</Button>
            <Button data={'8'} onClick={appendValue}>8</Button>
            <Button data={'9'} onClick={appendValue}>9</Button>
            <Button data={'x'} onClick={elegirOperacion} operation>x</Button>
            <Button data={'4'} onClick={appendValue}>4</Button>
            <Button data={'5'} onClick={appendValue}>5</Button>
            <Button data={'6'} onClick={appendValue}>6</Button>
            <Button data={'+'} onClick={elegirOperacion} operation>+</Button>
            <Button data={'1'} onClick={appendValue}>1</Button>
            <Button data={'2'} onClick={appendValue}>2</Button>
            <Button data={'3'} onClick={appendValue}>3</Button>
            <Button data={'-'} onClick={elegirOperacion} operation>-</Button> 
            <Button period data={'.'} onClick={appendValue}>.</Button>
            <Button data={'0'} onClick={appendValue}>0</Button>
            <Button gridSpan={2} equals onClick={igual}>=</Button>
        </Container> 
        
       
    )
}