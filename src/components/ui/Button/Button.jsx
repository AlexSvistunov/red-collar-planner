import styles from './Button.module.scss'

const Button = ({children}) => {
  return (
    <div className={styles.button}>
      {children}
    </div>
  )
}

export default Button