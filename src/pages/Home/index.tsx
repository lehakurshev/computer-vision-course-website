// Local imports
import PageTree from '../../components/PageTree';
import TelegramPostWidget from '../../components/TelegramDiscussionWidget';


// Component definition
function HomePage() {
  const treeData = [
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
      <div>
        <PageTree treeData={treeData} onNodeClick={handleNodeClick} />
        <TelegramPostWidget></TelegramPostWidget>
      </div>
    </div>
  );
}

// Default export
export default HomePage;
