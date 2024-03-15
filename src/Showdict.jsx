import { useState } from "react";

function DictWords() {
    const [words, setwords] = useState([])
    const [key, setkey] = useState('')




    async function Fetchwords(keyword) {   // on go button click run 
        try {
            let URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`
            const response = await fetch(URL)
            if (response.ok) {
                const Data = await response.json()
                setwords(Data)
                console.log(words)
            }
        }

        catch (error) {
            console.log("data fetching failed ", error);

        }
    }

    function Searchkeyword(e) {
        setkey(e.target.value)
    }

    function ListenIt(ad) {

        window.open(ad, "_blank")
    }

    return (
        <>
            <div className="Nav_container">
                <div className="heading">
                   <h2 className="name">Dictionary</h2>
                </div>
                <div className="Search_container">
                    <div className="Right_search">

                        <input type="text" className="Input" onChange={Searchkeyword} placeholder="Search word" />
                        <button type="button" className="Go_btn" onClick={() => Fetchwords(key)}  >GO</button>
                    </div>

                </div>

            </div>
            <div >
                {words.slice(0,2).map((wd, index) => (
                    <>
                        <div key={index} className="main_div">
                            <div className="Word_div">
                                <h2>{wd.word}</h2>

                                {wd.phonetics &&  (
                                    <p  className="audio" onClick={() => ListenIt(wd.phonetics[0].audio)}>Listen It</p>
                                )}

                            </div>

                            <h3> Definations </h3>
                            <div className="Defination_main">
                            <div className="Defination_div">
                                {wd.meanings.map((mean, index) => (
                                   
                                    <p key={index}> {mean.definitions[0].definition}  </p>

                                ))}
                            </div>
                            </div>
                        </div>

                        <h3 >
                            examples
                        </h3>
                        {wd.meanings.map((mn) => mn.definitions.map((def, index) => (
                            <div key={index} className="Example_div">
                                <p>{def.definition}</p>
                            </div>

                        )))}



                    </>
                ))}

            </div>

            <footer>
                <div className="Line"> made with Love by web developer</div>


            </footer>

        </>
    )
}

export default DictWords;