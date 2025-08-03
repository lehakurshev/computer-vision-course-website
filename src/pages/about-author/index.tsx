// Local imports
import PageTree from '../../components/PageTree';

// Component definition
function AboutAuthor(){ const treeData = [
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
          AboutAuthor
          {/* Остальное содержимое вашей страницы */}
        </div>
      );
    }

// Default export
export default AboutAuthor;
