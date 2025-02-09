import { useState } from "react";

import { Container } from "react-bootstrap";
import Header from "./components/common/Header.component";
import Footer from "./components/common/Footer.component";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>FakeEvents</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
