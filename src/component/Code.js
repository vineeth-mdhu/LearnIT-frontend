import { useContext, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { ThemeContext } from '../App';
import styles from '@/styles/Markdown.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

const Code = ({ children, language }) => {
  const [copied, setCopied] = useState(false);
//   const { isDark } = useContext(ThemeContext);
const isDark=true;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <div className={styles.code}>
      <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
        <div className={styles.copy_icon}>
          {copied ? <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> : <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>}
        </div>
      </CopyToClipboard>
      
      <SyntaxHighlighter
        language={language}
        style={isDark ? materialDark : materialLight}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export default Code