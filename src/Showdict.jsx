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

    return (
        <>
            <div className="Nav_container">
                <div className="heading">
                    Dictionary
                </div>
               <div className="Search_container">
                <div className="Right_search">
                 
                <input type="text" className="Input" onChange={Searchkeyword} placeholder="Search word" />
                <button type="button" className="Go_btn" onClick={() => Fetchwords(key)}  >GO</button>
               </div>

                </div>
               
            </div>
                <div >
                    {words.map((wd , index) => (
                        <>
                        <div key={index} className="main_div">
                            <div className="Word_div">
                            <h1>{wd.word}</h1>

                            <p>link</p>
                            </div>
                            
                            <h3> Definations </h3>
                            <div className="Defination_div">
                            {wd.meanings.map((mean ,index) => (    
                                   <p key= {index}>    {mean.definitions[0].definition}    </p>
            
                            ))}
                              </div>
                  </div>
                           
                            <h3 >
                                examples
                            </h3>
                            {wd.meanings.map((mn) => mn.definitions.map((def , index) => (
                                 <div key={index} className="Defination_div">
                              <p>{def.definition}</p>
                              </div>
                                 
                            )))}
                           


                        </>
                    ))}
                    
                </div>
             
        </>
    )
}

export default DictWords;