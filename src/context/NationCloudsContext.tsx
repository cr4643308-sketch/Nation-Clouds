import React, { createContext, useContext, useState } from 'react';

interface Server {
  id: string;
  name: string;
  ram: number;
  ip: string;
  status: 'Online' | 'Offline' | 'Starting...' | 'Restarting...';
}

interface MasterNode {
  ram: number;
  servers: Server[];
}

interface NationCloudsContextType {
  masterNode: MasterNode;
  deployServer: (server: Omit<Server, 'id' | 'status' | 'ip'>) => void;
  updateServerStatus: (id: string, status: Server['status']) => void;
}

const NationCloudsContext = createContext<NationCloudsContextType | undefined>(undefined);

export const NationCloudsProvider = ({ children }: { children: React.ReactNode }) => {
  const [masterNode, setMasterNode] = useState<MasterNode>({
    ram: 128,
    servers: []
  });

  const deployServer = (server: Omit<Server, 'id' | 'status' | 'ip'>) => {
    const newServer: Server = {
      ...server,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Online',
      ip: `${(masterNode.servers.length + 1).toString().padStart(2, '0')}.Nationclouds.fun`
    };
    setMasterNode(prev => ({
      ram: prev.ram - server.ram,
      servers: [...prev.servers, newServer]
    }));
  };

  const updateServerStatus = (id: string, status: Server['status']) => {
    setMasterNode(prev => ({
      ...prev,
      servers: prev.servers.map(s => s.id === id ? { ...s, status } : s)
    }));
  };

  return (
    <NationCloudsContext.Provider value={{ masterNode, deployServer, updateServerStatus }}>
      {children}
    </NationCloudsContext.Provider>
  );
};

export const useNationClouds = () => {
  const context = useContext(NationCloudsContext);
  if (!context) throw new Error('useNationClouds must be used within a NationCloudsProvider');
  return context;
};
