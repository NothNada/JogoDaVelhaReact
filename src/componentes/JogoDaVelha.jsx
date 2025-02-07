import React,{ useState, useEffect } from 'react';

export default function JogoDaVelha() {

    const jogoInicial = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

    const [jogo,setJogo] = useState(jogoInicial);
    const [jogador,setJogador] = useState('X');
    const [vitoria,setVitoria] = useState(false);
    const [empate,setEmpate] = useState(false);


    const tabela = {
        width: "600px",
        height: "600px",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        cursor:"pointer"
    };

    const linha = {
        display: "flex",
        flexDirection: "row",
        width: "600px",
        height: "200px"
    };

    const casa = {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width:"200px",
        height:"200px",
        fontSize:"100px",
        border:"#fff solid 1px"
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

        (0,0) (0,1) (0,2)
        (1,0) (1,1) (1,2)
        (2,0) (2,1) (2,2)

        */
        let vitorias = [
            [ [0,0] , [0,1] , [0,2] ],
            [ [1,0] , [1,1] , [1,2] ],
            [ [2,0] , [2,1] , [2,2] ],
            [ [0,0] , [1,0] , [2,0] ],
            [ [0,1] , [1,1] , [2,1] ],
            [ [0,2] , [1,2] , [2,2] ],
            [ [0,0] , [1,1] , [2,2] ],
            [ [0,2] , [1,1] , [2,0] ]
        ]

        let foi = false;

        for(const k of vitorias){
            if(jogo[k[0][0]][k[0][1]]==quem  && jogo[k[1][0]][k[1][1]]==quem && jogo[k[2][0]][k[2][1]]==quem){
                foi = true;
                setJogador(quem);
            }
        }

        if(foi){
            setVitoria(true);
        }
    }

    function verificaEmpate(){
        let casasPreenchida = 0;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
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

        for (let i=0;i<3;i++) {
            let novo = novoJogo[i];
            for (let j=0;j<3;j++){
                if(j+(i*3) == id && novo[j] == ''){
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
                    e.map((ee,i) => <div onClick={clique} style={casa} id={i + (ii*3)}> {ee} </div>)
                }
            </div>
        );

        return (
            <>
                
                {vitoria ? 
                (
                    ( empate ? (
                    <>
                        <h1> Empatou </h1>
                        <button style={btn} onClick={reiniciar}> Começar denovo </button>
                    </>
                    ) : (
                    <>
                        <h1> O Jogador { jogador } Venceu </h1>
                        <button style={btn} onClick={reiniciar}> Começar denovo </button>
                    </>
                    ))
                ):
                (
                <>
                    <h3>Vez do Jogador {jogador}</h3>
                    <div style={tabela}>
                        {linhas}
                    </div>
                </>
                )
                }
            </>
            
        )
    }

    return desenhaTabela()
};
