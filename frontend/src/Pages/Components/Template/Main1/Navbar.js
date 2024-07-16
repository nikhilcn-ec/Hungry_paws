import ApplicationStore from '../../../../utils/localStorageUtil';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../../context/AuthContext';
function Navbar(){
    const { user, Logout } = useAuthContext();

    const userRole = ApplicationStore().getStorage('userRole');
    return(<>
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
  <div className="container">
    <a className="navbar-brand" href="index.html"><span className="flaticon-pawprint-1 mr-2" />Hungry Paws</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="fa fa-bars" /> Menu
    </button>
    <div className="collapse navbar-collapse" id="ftco-nav">
      <ul className="navbar-nav ml-auto">
      {userRole === "user" ? (
        <>
        <li className="nav-item active"><a href="/CustHome" className="nav-link">Home</a></li>
        <li className="nav-item"><a href="/Work" className="nav-link">Work</a></li>
        <li className="nav-item"><a href="/Gallery" className="nav-link">Gallery</a></li>
        <li className="nav-item"><a href="/DonateUs" className="nav-link">Donate</a></li>
        <li className="nav-item"><a href="/VeterinaryUser" className="nav-link">Veterinary</a></li>
        <li className="nav-item"><a href="/VaccineUser" className="nav-link">Vaccination</a></li>
        <li className="nav-item"><a href="/RescueUser" className="nav-link">Rescue</a></li>
        <li className="nav-item"><a href="/Volunteer" className="nav-link">Volunteer</a></li>
        <li className="nav-item"><a href="/AdoptList" className="nav-link">AdoptPet</a></li>
        <li className="nav-item"><a href onClick={Logout} className="nav-link">Logout</a></li>

        </>
      ) : userRole === "" }

      </ul>
    </div>
  </div>
</nav>

    </>)
}
export default Navbar;