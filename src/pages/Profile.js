// Tela de perfil: `/perfil`;
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileScreen from '../components/ProfileScreen';
import '../styles/profile.css';

function Profile() {
  return (
    <div>
      <Header title="Perfil" isEnableSearchIcon={ false } />
      <ProfileScreen />
      <Footer />
    </div>
  );
}

export default Profile;
