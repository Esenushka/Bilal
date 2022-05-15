import AdminNavBar from '../../components/common/AdminNavBar/AdminNavBar'
import KyrsEdit from '../../components/common/KyrsEdit/KyrsEdit'

export default function Dashboard(props) {
  return (
    <div>
      <AdminNavBar {...props}/>
      <KyrsEdit/>
    </div>
  )
}
