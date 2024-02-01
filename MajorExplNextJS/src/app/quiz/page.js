'use client'

import Image from "next/image";
import quiz from '/src/components/quiz.png'
import { useState } from 'react'

export default function Home() {

  const sayHello = (event) => {
    alert("Hello")
    ;
  };


  return (
    <main className="flex min-h-screen flex-col items-center p-24">

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      </div>

      <div id="wrapper">
        <h1>What kind of College of Engineering major might work for you?</h1>
        <br />

        <form id="quiz">
          {/* Question 01 */}
          <h2>What do you value most when it comes to a career?</h2>
          
          {/* Question 1 answers */}
          <label><input type="radio" name="q1" value="c1"/>
          Financial security
          </label><br />
          <label><input type="radio" name="q1" value="c2"/>
          Helping others
          </label><br />
          <label><input type="radio" name="q1" value="c3"/>
          Job stability
          </label><br />
          <label><input type="radio" name="q1" value="c4"/>
          Developing technologies
          </label><br />
          <br />

          {/* Question 02 */}
          <h2>What is your ideal work environment?</h2>
  
          {/* Question 02 Answers */}
          <label><input type="radio" name="q2" value="c1"/>
          A laboratory
          </label><br />
          <label><input type="radio" name="q2" value="c2"/>
          A place with high levels of appreciation
          </label><br />
          <label><input type="radio" name="q2" value="c3"/>
          A place with cutting edge equipment
          </label><br />
          <label><input type="radio" name="q2" value="c4"/>
          An informal environment such as from home
          </label><br />
          <br />
    
          {/* Question 03 */}
          <h2>Who inspires you?</h2>
  
          {/* Question 03 Answers*/}
          <label><input type="radio" name="q3" value="c1"/>
          Developers of new technologies
          </label><br />
          <label><input type="radio" name="q3" value="c2"/>
          People who sacrifice for the greater good
          </label><br />
          <label><input type="radio" name="q3" value="c3"/>
          Creative or artistic people
          </label><br />
          <label><input type="radio" name="q3" value="c4"/>
          Innovative people
          </label><br />
          <br />
    
          {/* Question 04 */}
          <h2>What do you do when you encounter a difficult problem?</h2>
  
          {/* Question 04 Answers */}
          <label><input type="radio" name="q4" value="c1"/>
          Research potential solutions independently
          </label><br />
          <label><input type="radio" name="q4" value="c2"/>
          Ask for help
          </label><br />
          <label><input type="radio" name="q4" value="c3"/>
          Step away from the problem to relax and gain perspective
          </label><br />
          <label><input type="radio" name="q4" value="c4"/>
          Experiment with potential solutions until one is successful
          </label><br />
          <br />

          {/* Buttons */}
          <button name="submit" type="submit" id="submit" onClick={sayHello}>Submit Your Answers</button>
          <button name="reset" type="reset" id="reset" onClick={sayHello}>Reset</button>
        </form>
  
        <div id="answer">Result</div>
      </div>

    </main>
  )
}
