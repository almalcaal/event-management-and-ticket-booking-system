import { Container } from "react-bootstrap";
import Header from "./components/common/Header.component";
import Footer from "./components/common/Footer.component";
import HomeScreen from "./screens/Home.screen.jsx";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
