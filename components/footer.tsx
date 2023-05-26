import styles from "./footer.module.css"
import packageJSON from "../package.json"

export default function Footer() {
  return (
    <footer className='w-full bg-primary'>
      <hr />
      <ul className='w-full flex text-white'>
        
        <li className='mx-auto text-sm p-1'>
          <em>My Read List copyrigth &copy; {new Date().getFullYear()}.</em>
        </li>
      </ul>
    </footer>
  )
}
