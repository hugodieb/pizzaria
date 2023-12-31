import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from '@stylesmodule/ui/Input/styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProps){
  return(
    <input className={styles.input} {...rest} />
  )
}

export function TextArea({...rest}: TextAreaProps){
  return(
    <TextArea className={styles.input} {...rest} />
  )
}