'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { UserProfile, UserAddress } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string, targetId?: string) => void;
  register: (name: string, email: string, phoneOrPass: string, passOrTarget?: string, targetId?: string) => void;
  logout: () => void;
  authModalOpen: boolean;
  targetProductId: string | null;
  openAuthGate: (productId?: string) => void;
  closeAuthGate: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  updateAddress: (id: string, address: Partial<UserAddress>) => void;
  deleteAddress: (id: string) => void;
}

const defaultAddresses: UserAddress[] = [
  {
    id: 'addr-default',
    fullName: 'Priya Sundaram',
    street: 'No. 42, Rukmani Street, T. Nagar',
    landmark: 'Near Panagal Park',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017',
    phone: '+91 98401 22345',
    isDefault: true,
  },
  {
    id: 'addr-2',
    fullName: 'Priya Sundaram',
    street: 'Flat 4B, Kaveri Heritage Apartments, Gandhi Road',
    landmark: 'Opposite Silk Board',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560068',
    phone: '+91 98401 22345',
    isDefault: false,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [targetProductId, setTargetProductId] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('deva_sarees_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      // ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (user) {
      localStorage.setItem('deva_sarees_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('deva_sarees_user');
    }
  }, [user, isLoaded]);

  const openAuthGate = (productId?: string) => {
    if (productId) {
      setTargetProductId(productId);
    }
    setAuthModalOpen(true);
  };

  const closeAuthGate = () => {
    setAuthModalOpen(false);
  };

  const login = (email: string, _pass: string, redirectTargetId?: string) => {
    const defaultName = email.split('@')[0] || 'Priya Sundaram';
    const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);

    const loggedInUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: formattedName.toLowerCase() === 'priya.sundaram' ? 'Priya Sundaram' : formattedName,
      email: email || 'priya.sundaram@gmail.com',
      phone: '+91 98401 22345',
      addresses: defaultAddresses,
    };

    setUser(loggedInUser);
    setAuthModalOpen(false);

    const destId = redirectTargetId || targetProductId;
    if (destId) {
      setTargetProductId(null);
      router.push(`/product/${destId}`);
    } else if (pathname === '/login' || pathname === '/register') {
      router.push('/account');
    }
  };

  const register = (
    name: string,
    email: string,
    phoneOrPass: string,
    passOrTarget?: string,
    redirectTargetId?: string
  ) => {
    const isFiveArgs = Boolean(redirectTargetId);
    const phone = isFiveArgs ? phoneOrPass : '+91 98401 22345';
    const dest = isFiveArgs ? redirectTargetId : passOrTarget;

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name || 'Priya Sundaram',
      email: email || 'priya.sundaram@gmail.com',
      phone: phone || '+91 98401 22345',
      addresses: defaultAddresses,
    };

    setUser(newUser);
    setAuthModalOpen(false);

    const destId = dest || targetProductId;
    if (destId) {
      setTargetProductId(null);
      router.push(`/product/${destId}`);
    } else if (pathname === '/login' || pathname === '/register') {
      router.push('/account');
    }
  };

  const logout = () => {
    setUser(null);
    router.push('/');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updated });
  };

  const addAddress = (address: Omit<UserAddress, 'id'>) => {
    if (!user) return;
    const newAddress: UserAddress = {
      ...address,
      id: 'addr-' + Date.now(),
    };
    setUser({
      ...user,
      addresses: [...user.addresses, newAddress],
    });
  };

  const updateAddress = (id: string, updated: Partial<UserAddress>) => {
    if (!user) return;
    setUser({
      ...user,
      addresses: user.addresses.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      addresses: user.addresses.filter((a) => a.id !== id),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        authModalOpen,
        targetProductId,
        openAuthGate,
        closeAuthGate,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
