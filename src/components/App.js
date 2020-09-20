import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `<html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>`
      )
    }, 250);
    // We need to clear the timeout so that anything user writes in between the timer won't get set into the timer queue
    return () => clearTimeout(timeout);

  }, [html, css, js])


  return (
    <>
      <div className="pane top-pane">
        <Editor 
          displayName="HTML" 
          language="xml"
          value={html}
          onChange={setHtml}
        />
        <Editor 
          displayName="CSS" 
          language="css"
          value={css}
          onChange={setCss}
        />
        <Editor 
          displayName="JS" 
          language="javascript"
          value={js}
          onChange={setJs}
        />
      </div>

      <div className="pane">
        <iframe
          title="output"
          frameBorder="0"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          srcDoc={srcDoc}
        />
      </div>
    </>
  );
}

export default App;
