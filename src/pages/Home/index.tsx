// Local imports
import HelloWorld from '../../components/HelloWorld';
import PageTree from '../../components/PageTree';

// Component definition
function HomePage(){ const treeData = [
        { id: 'home', label: 'Home' },
        {
          id: 'about',
          label: 'About Us',
          children: [
            { id: 'history', label: 'Our History' },
            { id: 'team', label: 'Our Team' },
          ],
        },
        { id: 'contact', label: 'Contact' },
      ];

      const handleNodeClick = (nodeId: string) => {
        console.log(`Navigating to: ${nodeId}`);
        // Здесь можно добавить логику навигации по вашему приложению
      };

      return (
        <div>
          <PageTree treeData={treeData} onNodeClick={handleNodeClick} />
          {/* Остальное содержимое вашей страницы */}
        </div>
      );
    }

// Default export
export default HomePage;
