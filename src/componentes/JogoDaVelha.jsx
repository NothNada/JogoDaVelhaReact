import React,{ useState, useEffect } from 'react';

export default function JogoDaVelha() {

    const jogoInicial = [
        ['','','','',''],

        ['', '','','' ,''],
        ['', '','','' ,''],
        ['', '','','' ,''],

        ['','','','','']
    ];

    const [jogo,setJogo] = useState(jogoInicial);
    const [jogador,setJogador] = useState('X');
    const [vitoria,setVitoria] = useState(false);
    const [empate,setEmpate] = useState(false);

    const [Nlinhas,Ncolunas] = [5,5];


    const tabela = {
        width: "300px",
        height: "300px",
        display: "flex",
        flexDirection: "column"
    };

    const linha = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "33%"
    };

    const casa = {
        backgroundColor: "#000",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"100%",
        fontSize:"3rem",
        border:"#fff solid 1px",
        cursor:"pointer"
    }

    const casaEsp = {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"100%",
        fontSize:"3rem"
    }

    const btn = {
        width:"200px",
        height:"50px",
        backgroundColor:"#101010",
        color:"#fff",
        border:"solid #fff 1px",
        borderRadius:"20px",
        cursor:"pointer"
    }

    useEffect(verifica);

    function reiniciar(){
        setJogo(jogoInicial);
        setJogador('X');
        setVitoria(false);
        setEmpate(false);
    }

    function verifica(){
        verificaVitoria('X');
        verificaVitoria('O');
        verificaEmpate();
    }

    function verificaVitoria(quem){
        /*

        ( 0 )   ( 1)  ( 2 ) ( 3 )   ( 4 )
         -------------------------------
        ( 5 ) - ( 6 ) ( 7 ) ( 8 ) - ( 9 )
        (10 ) - (11 ) (12 ) (13 ) - (14 )
        (15 ) - (16 ) (17 ) (18 ) - (19 )
         -------------------------------
        (20 )   (21 ) (22 ) (23 )   (24 )

        */
       let foi =false;

        for(let l=0;l<Nlinhas;l++){
            for(let c=0;c<Ncolunas;c++){
                if (jogo[l][c] && jogo[l][c] === jogo[l][c + 1] && jogo[l][c] === jogo[l][c + 2]) {
                    foi = true;
                    setJogador(jogo[i][j]);
                }
            }
        }

        for (let j = 0; j < Nlinhas; j++) {
            for (let i = 0; i <= Ncolunas - 3; i++) {
                if (jogo[i][j] && jogo[i][j] === jogo[i + 1][j] && jogo[i][j] === jogo[i + 2][j]) {
                    foi = true;
                    setJogador(jogo[i][j]);
                }
            }
        }

        for (let i = 0; i <= Nlinhas - 3; i++) {
            for (let j = 0; j <= Ncolunas - 3; j++) {
                if (jogo[i][j] && jogo[i][j] === jogo[i + 1][j + 1] && jogo[i][j] === jogo[i + 2][j + 2]) {
                    foi = true;
                    setJogador(jogo[i][j]);
                }
            }
        }

        for (let i = 0; i <= Nlinhas - 3; i++) {
            for (let j = 0; j <= Ncolunas - 3; j++) {
                if (jogo[i][j] && jogo[i][j] === jogo[i + 1][j + 1] && jogo[i][j] === jogo[i + 2][j + 2]) {
                    foi = true;
                    setJogador(jogo[i][j]);
                }
            }
        }

        for (let i = 0; i <= Nlinhas - 3; i++) {
            for (let j = 2; j < Ncolunas; j++) {
                if (jogo[i][j] && jogo[i][j] === jogo[i + 1][j - 1] && jogo[i][j] === jogo[i + 2][j - 2]) {
                    foi = true;
                    setJogador(jogo[i][j]);
                }
            }
        }

        if(foi){
            setVitoria(true);
            setEmpate(false);
        }
    }

    function verificaEmpate(){
        let casasPreenchida = 0;
        for(let i=1;i<4;i++){
            for(let j=1;j<4;j++){
                if(jogo[i][j] != ''){
                    casasPreenchida ++;
                }
            }
        }

        if(casasPreenchida == 9){
            setEmpate(true);
            setVitoria(true);
        }
    }

    function clique(e){
        const id = e.target.id;
        let foi = false;
        let novoJogo = jogo;

        for (let i=0;i<Nlinhas;i++) {
            let novo = novoJogo[i];
            for (let j=0;j<Ncolunas;j++){
                if(j+(i*Nlinhas) == id && novo[j] == ''){
                    novo[j] = jogador;
                    foi = true;
                    novoJogo[i] = novo;
                }
            }
        }

        setJogo(novoJogo);
        if(foi){
            setJogador(( jogador == 'X' ? 'O' : 'X'));
        }
    }

    function desenhaTabela(){

        const linhas = jogo.map((e,ii)=>
            <div style={linha}>
                {
                    e.map((ee,i) =>{
                        let id = i + (ii*Nlinhas);
                        if((id >= 6 && id <= 8) || (id >= 11 && id <= 13) || (id >= 16 && id <= 18)){
                            return <div onClick={clique} style={casa} id={i + (ii*Nlinhas)}> {ee} </div>;
                        }else{
                            return <div onClick={clique} style={casaEsp} id={i + (ii*Nlinhas)}> {ee} </div>;
                        }
                        
                    })
                }
            </div>
        );

        const direito = (event)=>{
            event.preventDefault();
            setJogador(( jogador == 'X' ? 'O' : 'X'));
        };

        return (
            <>                
                {
                    vitoria ? (
                        empate ? (
                                <h1> Empatou </h1>
                            ) : (
                                <h1> O Jogador { jogador } Venceu </h1>
                            )
                    ):(
                    <h3>Vez do Jogador {jogador}</h3>
                    )
                }
                <div style={tabela} onContextMenu={direito}>
                    {linhas}
                </div>
            </>
            
        )
    }

    return desenhaTabela()
};
