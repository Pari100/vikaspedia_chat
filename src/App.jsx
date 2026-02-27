import Navbar from './components/Navbar';
import ChatFeature from './components/ChatFeature';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      
      <header className="app-header">
        <h1>Global Population Statistics</h1>
        <p className="subtitle">Understanding demographic trends and projections</p>
      </header>

      <main id="mainContent" className="app-content">
        <section className="content-section" style={{'--section-index': 0}}>
          <h2>Current Global Population</h2>
          <p>
            As of 2024, the world population stands at approximately 8.1 billion people. 
            This represents a significant milestone in human history, with the population 
            having doubled since 1974. The rate of growth, however, has been gradually 
            declining over the past few decades.
          </p>
        </section>

        <section className="content-section" style={{'--section-index': 1}}>
          <h2>Population Projections for 2050</h2>
          <p>
            According to the United Nations Department of Economic and Social Affairs, 
            the global population is projected to reach <strong>9.7 billion</strong> by 2050. 
            This projection takes into account current fertility rates, mortality rates, 
            and migration patterns across different regions.
          </p>
          <p>
            The growth will not be uniform across all regions. Africa is expected to 
            experience the most significant population increase, while Europe's population 
            is projected to decline slightly.
          </p>
        </section>

        <section className="content-section" style={{'--section-index': 2}}>
          <h2>Regional Distribution</h2>
          <p>
            Asia currently hosts about 60% of the world's population, with China and India 
            being the two most populous countries. However, India is expected to surpass 
            China as the world's most populous nation by 2027.
          </p>
          <ul>
            <li><strong>Asia:</strong> 4.7 billion (59% of global population)</li>
            <li><strong>Africa:</strong> 1.4 billion (18% of global population)</li>
            <li><strong>Europe:</strong> 750 million (9% of global population)</li>
            <li><strong>Latin America:</strong> 660 million (8% of global population)</li>
            <li><strong>North America:</strong> 380 million (5% of global population)</li>
            <li><strong>Oceania:</strong> 45 million (0.5% of global population)</li>
          </ul>
        </section>

        <section className="content-section" style={{'--section-index': 3}}>
          <h2>Demographic Challenges</h2>
          <p>
            The changing population dynamics present several challenges for the global 
            community. Aging populations in developed countries require robust healthcare 
            and pension systems, while rapidly growing populations in developing regions 
            need infrastructure, education, and employment opportunities.
          </p>
          <p>
            Sustainable development goals emphasize the importance of managing population 
            growth while ensuring quality of life, environmental sustainability, and 
            economic prosperity for all.
          </p>
        </section>

        <section className="content-section" style={{'--section-index': 4}}>
          <h2>Urbanization Trends</h2>
          <p>
            By 2050, approximately 68% of the world's population is expected to live in 
            urban areas, up from 55% in 2018. This rapid urbanization presents both 
            opportunities and challenges for city planning, infrastructure development, 
            and environmental management.
          </p>
        </section>
      </main>

      <footer className="app-footer">
        <p>Data source: Vikaspedia</p>
        <p>Last updated: 2026</p>
      </footer>

      <ChatFeature />
    </div>
  );
}

export default App;
