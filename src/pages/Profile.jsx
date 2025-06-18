import Sidebar from '../components/Sidebar';
import React from 'react';
import AvatarGenerator from '../components/AvatarGenerator';
import { FaEnvelope } from 'react-icons/fa';
import {db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';



const Profile = () => {

  const [projectStats, setProjectStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    failed: 0,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const user = auth.currentUser;
      const q = query(collection(db, "projects"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);

      const stats = { total: 0, completed: 0, inProgress: 0, failed: 0 };

      snapshot.forEach((doc) => {
        stats.total++;
        const status = doc.data().status?.toLowerCase();
        if (status === "completed") stats.completed++;
        else if (status === "failed") stats.failed++;
      });

      setProjectStats(stats);
    };

    fetchProjects();
  }, []);

  const [loginData, setLoginData] = useState({ createdAt: '', lastLogin: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.reload().then(() => {
          setLoginData({
            createdAt: new Date(user.metadata.creationTime).toLocaleDateString(),
            lastLogin: new Date(user.metadata.lastSignInTime).toLocaleString()
          });
        });
      }
    });

    return () => unsubscribe();
  }, []);
  const user = auth.currentUser;

  if (!user) return <div className="text-center py-8 text-gray-500">No user data available.</div>;

  const fullName = user.displayName || 'No Name';
  const email = user.email;

  return (
    <div className='relative -z-10 w-full flex min-h-screen bg-gray-200/40'>
      <div className='absolute -z-20 top-1/5 left-1/3 md:left-1/18 w-[150px] h-[150px] md:w-[400px] md:h-[400px] blur-xl rounded-full md:blur-3xl bg-[#dba159]'></div>
      <Sidebar />
      <div className='sm:ml-6 mt-20 w-full flex items-center justify-center'>
        <div className="w-full h-full mx-auto p-2">
          <div className="rounded-3xl h-full bg-white/20 backdrop-blur-lg shadow-xl border border-white/20 overflow-hidden">
            {/* Gradient Header */}
            <div className="relative h-32 bg-gradient-to-r from-[#70abaf] to-[#8c89e2]">
              <div className="absolute -bottom-20 left-6">
                <div className="w-40 h-40 rounded-xl border-4 border-white/60 overflow-hidden shadow-md">
                  <AvatarGenerator className='w-full' name={fullName || 'User'} />
                </div>
              </div>
            </div>
            {/* User Info Section */}
            <div className="pt-14 px-6 pb-6 mt-10 text-black" style={{ fontFamily: 'Quicksand' }}>
              <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Syne' }}>{fullName}</h2>
              <p className="text-sm font-semibold text-gray-700">{email}</p>

              {/* Contact Info */}
              <div className="mt-6 bg-white/30 backdrop-blur-md border border-white/30 rounded-xl p-4 shadow-md">
                <h3 className="text-md font-semibold mb-3 flex items-center gap-2 text-gray-800">
                  <FaEnvelope className="text-[#5e81f4]" />
                  Contact Information
                </h3>
                <ul className="space-y-2 text-sm text-gray-800">
                  <li className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-500" />
                    <span>{email}</span>
                  </li>
                </ul>
              </div>

              {/* Stats Summary */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Total Projects', value: projectStats.total, color: 'bg-blue-400' },
                  { label: 'Completed', value: projectStats.completed, color: 'bg-green-400' },
                  { label: 'Failed', value: projectStats.failed, color: 'bg-red-400' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`rounded-xl ${stat.color}/20 backdrop-blur-sm border border-white/30 p-4 flex flex-col items-center justify-center shadow-sm`}
                  >
                    <span className="text-lg font-semibold text-black">{stat.value}</span>
                    <span className="text-sm text-gray-700">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Joined & Last Login */}
              <div className="mt-6 bg-white/30 backdrop-blur-md border border-white/30 rounded-xl p-4 shadow-md text-sm text-gray-800">
                <p className="mb-2"><span className="font-semibold">Joined:</span> {loginData.createdAt}</p>
                <p><span className="font-semibold">Last Login:</span> {loginData.lastLogin}</p>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;