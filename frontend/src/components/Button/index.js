import styles from './Button.module.css'

const Button = ({
  primary = true,
  icon = null,
  text = '',
  onClick = () => {},
  datatest = null
}) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={primary ? styles.button : styles.secondaryButton} onClick={onClick} data-test={datatest}>
        {icon}
        {text}
      </button>
    </div>
  )
}

export default Button
