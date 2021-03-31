//Importar Componentes
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Tema1 from '../../components/Tema1';
import Tema2 from '../../components/Tema2';
import Tema3 from '../../components/Tema3';
import Cards from '../../components/Cards';
import Lista1 from '../../components/Lista1';
import Lista2 from '../../components/Lista2';
import Footer from '../../components/Footer';

export default function Home() {

  return (
    <div>
      <title>UFG - Inicio</title>
      <Menu />
      <Header />
      <Cards />
      <Footer />
    </div>
  );
}
