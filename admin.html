// app.js (fixed & hardened)
// Import exports from your firebase.js
import { auth, db, app as mainApp, firebaseConfig } from './firebase.js';

// Firebase Auth (module) helpers
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth as getAuthForApp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firestore modular functions
import {
  doc, setDoc, addDoc, getDoc, getDocs, collection, query, where, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// App management (for secondary app)
import { initializeApp as initializeAppMod, deleteApp as deleteAppMod } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

// -------------------- Helpers --------------------
async function createLog(userId, role, action, details = '') {
  try {
    await addDoc(collection(db, 'logs'), {
      timestamp: new Date().toISOString(),
      userId, role, action, details
    });
  } catch (e) {
    console.error("Failed to write log:", e);
  }
}

function showMsg(el, text) { if (el) el.textContent = text; }

async function getCurrentUserData() {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    const snap = await getDoc(doc(db, 'users', user.uid));
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.error("getCurrentUserData error:", e);
    return null;
  }
}

async function logoutAndRedirect() {
  try {
    await signOut(auth);
  } catch (e) {
    console.error("Sign out error:", e);
  }
  location.href = 'index.html';
}

// make commonly used window helpers visible immediately so HTML onclicks never fail
window.logoutAndRedirect = logoutAndRedirect;

// -------------------- AUTH forms hooking --------------------
window.hookAuthForms = function () {
  const regForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const authMsg = document.getElementById('auth-msg');

  if (regForm) {
  regForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const authMsg = document.getElementById('auth-msg');
    try {
      authMsg && (authMsg.textContent = 'Registering...');

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const role = document.getElementById('reg-role').value;
      const dept = document.getElementById('reg-dept')?.value || '';
      const subjects = (document.getElementById('reg-subject')?.value || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      if (!name || !email || !password) {
        authMsg && (authMsg.textContent = 'Please fill all fields.');
        return;
      }

      // Create auth user (this signs in the new user)
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      // Write profile document under /users/uid
      const profile = {
        name,
        email,
        role,
        dept,
        subjects,
        approved: role === 'teacher', // admin/teacher policy (you can change)
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', uid), profile);

      // If teacher also keep a /teachers doc for fast lookups
      if (role === 'teacher') {
        await setDoc(doc(db, 'teachers', uid), {
          uid, name, email, dept, subjects, createdAt: new Date().toISOString()
        });
      }

      await createLog(uid, role, 'register', `role:${role}`);

      authMsg && (authMsg.textContent = '✅ Registered successfully!');

      // If you want to auto-logout the freshly created user (so they don't remain signed in before admin approval),
      // you can sign them out immediately and show message. Uncomment if required:
      // await signOut(auth);

      regForm.reset();
    } catch (err) {
      console.error("Register error (detailed):", err);
      // Friendly message to UI
      authMsg && (authMsg.textContent = 'Register error: ' + (err?.message || err?.code || 'unknown'));
    }
  });
}


  if (loginForm) {
    loginForm.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const role = document.getElementById('login-role').value;

      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;
        const userDoc = await getDoc(doc(db, 'users', uid));

        if (!userDoc.exists()) return showMsg(authMsg, 'Profile missing. Contact admin.');

        const udata = userDoc.data();
        if (udata.role !== role) return showMsg(authMsg, 'Role mismatch.');
        if (udata.role === 'student' && !udata.approved) {
          return showMsg(authMsg, 'Waiting for admin approval.');
        }

        await createLog(uid, role, 'login', `as ${role}`);

        if (role === 'admin') location.href = 'admin.html';
        else if (role === 'teacher') location.href = 'teacher.html';
        else location.href = 'student.html';
      } catch (err) {
        console.error("Login error:", err);
        showMsg(authMsg, 'Login error: ' + (err.message || err.code));
      }
    });
  }
};

// -------------------- ADMIN PAGE --------------------
window.initAdminPage = function () {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return location.href = 'index.html';

    const profile = await getCurrentUserData();
    if (!profile || profile.role !== 'admin') {
      alert('Not authorized');
      return logoutAndRedirect();
    }

    document.getElementById('admin-logout')?.addEventListener('click', logoutAndRedirect);
    document.getElementById('admin-add-teacher')?.addEventListener('click', adminAddTeacher);
    document.getElementById('admin-add-student')?.addEventListener('click', adminAddStudent);

    // initial load
    loadPendingStudents();
    loadTeachersList();
    loadStudentsList();
    loadLogs();
  });

  async function adminAddTeacher() {
    try {
      const name = document.getElementById('admin-add-name').value.trim();
      const email = document.getElementById('admin-add-email').value.trim();
      const dept = document.getElementById('admin-add-dept').value.trim();
      const subjects = (document.getElementById('admin-add-subject')?.value || '')
        .split(',').map(s => s.trim()).filter(Boolean);

      if (!name || !email) return alert('Enter name and email.');

      const password = "teacher123";
      const adminUser = auth.currentUser;

      const secondaryApp = initializeAppMod(firebaseConfig, `secondary-${Date.now()}`);
      const secondaryAuth = getAuthForApp(secondaryApp);

      try {
        const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
        const uid = cred.user.uid;

        // save consistent shape in users collection (role + approved)
        await setDoc(doc(db, 'users', uid), {
          name, email, dept, subjects, role: 'teacher', approved: true, createdAt: new Date().toISOString()
        });

        await setDoc(doc(db, 'teachers', uid), {
          uid, name, email, dept, subjects, createdAt: new Date().toISOString()
        });

        await createLog(adminUser.uid, 'admin', 'add-teacher', email);
        alert(`✅ Teacher created!\nEmail: ${email}\nPassword: ${password}`);
        loadTeachersList();
      } finally {
        try { await signOut(secondaryAuth); } catch (e) { /* ignore */ }
        try { await deleteAppMod(secondaryApp); } catch (e) { /* ignore */ }
      }
    } catch (e) {
      console.error("adminAddTeacher error:", e);
      alert("Error adding teacher: " + (e.message || e.code));
    }
  }

  async function adminAddStudent() {
    try {
      const name = document.getElementById('admin-add-student-name').value.trim();
      const email = document.getElementById('admin-add-student-email').value.trim();
      if (!name || !email) return alert('Enter both name and email.');

      const password = "student123";
      const adminUser = auth.currentUser;
      const secondaryApp = initializeAppMod(firebaseConfig, `secondary-${Date.now()}`);
      const secondaryAuth = getAuthForApp(secondaryApp);

      try {
        const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
        const uid = cred.user.uid;
        await setDoc(doc(db, 'users', uid), {
          name, email, role: 'student', approved: true, createdAt: new Date().toISOString()
        });
        await createLog(adminUser.uid, 'admin', 'add-student', email);
        alert(`✅ Student created!\nEmail: ${email}\nPassword: ${password}`);
        loadStudentsList();
      } finally {
        try { await signOut(secondaryAuth); } catch (e) { /* ignore */ }
        try { await deleteAppMod(secondaryApp); } catch (e) { /* ignore */ }
      }
    } catch (e) {
      console.error("adminAddStudent error:", e);
      alert("Error adding student: " + (e.message || e.code));
    }
  }

  async function loadPendingStudents() {
    try {
      const div = document.getElementById('pending-students');
      if (!div) return;
      div.innerHTML = 'Loading...';

      const qSnap = await getDocs(query(collection(db, 'users'), where('role', '==', 'student')));
      div.innerHTML = '';
      let any = false;
      qSnap.forEach(snap => {
        const d = snap.data();
        if (!d.approved) {
          any = true;
          const el = document.createElement('div');
          el.innerHTML = `
            <strong>${d.name}</strong> — ${d.email}
            <button class="small-btn" onclick="approveStudent('${snap.id}')">Approve</button>
          `;
          div.appendChild(el);
        }
      });
      if (!any) div.innerHTML = '<em>No pending students</em>';
    } catch (e) {
      console.error("loadPendingStudents error:", e);
    }
  }

  async function loadTeachersList() {
    try {
      const div = document.getElementById('teachers-list');
      if (!div) return;
      div.innerHTML = 'Loading...';
      const snaps = await getDocs(collection(db, 'teachers'));
      div.innerHTML = '';
      if (snaps.empty) { div.innerHTML = '<em>No teachers yet</em>'; return; }
      snaps.forEach(snap => {
        const t = snap.data();
        const el = document.createElement('div');
        el.innerHTML = `
          <strong>${t.name}</strong> — ${t.email}
          <button class="small-btn" onclick="deleteTeacher('${snap.id}')">Delete</button>`;
        div.appendChild(el);
      });
    } catch (e) {
      console.error("loadTeachersList error:", e);
    }
  }

  async function loadStudentsList() {
    try {
      const div = document.getElementById('students-list');
      if (!div) return;
      div.innerHTML = 'Loading...';
      const snaps = await getDocs(query(collection(db, 'users'), where('role', '==', 'student')));
      div.innerHTML = '';
      if (snaps.empty) { div.innerHTML = '<em>No students yet</em>'; return; }
      snaps.forEach(snap => {
        const s = snap.data();
        const el = document.createElement('div');
        el.innerHTML = `
          <strong>${s.name}</strong> — ${s.email} — ${s.approved ? '✅' : '⏳'}
          <button class="small-btn" onclick="editStudent('${snap.id}')">Edit</button>
          <button class="small-btn" onclick="deleteStudent('${snap.id}')">Delete</button>`;
        div.appendChild(el);
      });
    } catch (e) {
      console.error("loadStudentsList error:", e);
    }
  }

  async function loadLogs() {
    try {
      const div = document.getElementById('logs');
      if (!div) return;
      div.innerHTML = 'Loading...';
      const snaps = await getDocs(collection(db, 'logs'));
      div.innerHTML = '';
      if (snaps.empty) { div.innerHTML = '<em>No logs yet</em>'; return; }
      snaps.forEach(snap => {
        const d = snap.data();
        const when = d.timestamp ? d.timestamp : new Date().toISOString();
        const el = document.createElement('div');
        el.textContent = `[${when}] ${d.role}:${d.userId} - ${d.action}`;
        div.appendChild(el);
      });
    } catch (e) {
      console.error("loadLogs error:", e);
    }
  }

  // expose admin actions globally (used by inline onclicks)
  window.approveStudent = async function (uid) {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (!snap.exists()) return alert('Student record not found.');
      const student = snap.data();
      if (!student.email) return alert('Missing email for this student.');

      await updateDoc(doc(db, 'users', uid), { approved: true });
      await createLog(auth.currentUser.uid, 'admin', 'approve-student', uid);

      alert(`✅ Student approved successfully!\nEmail: ${student.email}`);
      loadPendingStudents();
      loadStudentsList();
    } catch (err) {
      console.error("approveStudent error:", err);
      alert("Error approving student: " + (err.message || err.code));
    }
  };

  window.deleteTeacher = async function (tid) {
    try {
      if (!confirm('Delete this teacher?')) return;
      await deleteDoc(doc(db, 'teachers', tid));
      await deleteDoc(doc(db, 'users', tid));
      await createLog(auth.currentUser.uid, 'admin', 'delete-teacher', tid);
      loadTeachersList();
      loadStudentsList();
    } catch (e) {
      console.error("deleteTeacher error:", e);
      alert("Error deleting teacher: " + (e.message || e.code));
    }
  };

  window.editStudent = async function (sid) {
    try {
      const snap = await getDoc(doc(db, 'users', sid));
      if (!snap.exists()) return alert('Student not found.');
      const s = snap.data();
      const newName = prompt('Name:', s.name) || s.name;
      const newEmail = prompt('Email:', s.email) || s.email;
      await updateDoc(doc(db, 'users', sid), { name: newName, email: newEmail });
      await createLog(auth.currentUser.uid, 'admin', 'edit-student', sid);
      loadStudentsList();
    } catch (e) {
      console.error("editStudent error:", e);
    }
  };

  window.deleteStudent = async function (sid) {
    try {
      if (!confirm('Delete this student?')) return;
      await deleteDoc(doc(db, 'users', sid));
      await createLog(auth.currentUser.uid, 'admin', 'delete-student', sid);
      loadStudentsList();
    } catch (e) {
      console.error("deleteStudent error:", e);
    }
  };
};

// -------------------- STUDENT PAGE --------------------
window.initStudentPage = function () {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return location.href = 'index.html';

    const udata = await getCurrentUserData();
    if (!udata || udata.role !== 'student') {
      alert('Not authorized');
      return logoutAndRedirect();
    }

    document.getElementById('student-logout')?.addEventListener('click', logoutAndRedirect);
    document.getElementById('search-btn')?.addEventListener('click', searchTeachers);
    document.getElementById('send-msg')?.addEventListener('click', sendMessage);

    await loadTeachersDropdown();
    await loadStudentAppointments();
  });

  async function searchTeachers() {
    try {
      const qText = document.getElementById('search-query').value.trim().toLowerCase();
      const resultsDiv = document.getElementById('search-results');
      if (!resultsDiv) return;
      resultsDiv.innerHTML = 'Searching...';

      const snaps = await getDocs(collection(db, 'teachers'));
      let found = [];

      snaps.forEach(snap => {
        const t = snap.data();
        if (!t) return;
        if (!qText || // if empty show all
          t.name?.toLowerCase().includes(qText) ||
          t.dept?.toLowerCase().includes(qText) ||
          (t.subjects || []).some(s => s.toLowerCase().includes(qText))
        ) {
          const payload = {...t, uid: snap.id};
          found.push(payload);
        }
      });

      if (!found.length) {
        resultsDiv.innerHTML = '<p>No teachers found.</p>';
        return;
      }

      resultsDiv.innerHTML = '';
      found.forEach(t => {
        const el = document.createElement('div');
        el.className = 'teacher-card';
        el.innerHTML = `
          <strong>${t.name}</strong> — ${t.dept || ''} <br>
          Subjects: ${(t.subjects || []).join(', ')} <br>
          <button onclick="bookAppointment('${t.uid}', '${(t.name||'Teacher').replace(/'/g,"\\'")}')">Book Appointment</button>
        `;
        resultsDiv.appendChild(el);
      });
    } catch (e) {
      console.error("searchTeachers error:", e);
      document.getElementById('search-results').innerHTML = '<p>Error searching teachers.</p>';
    }
  }

  // expose booking globally
  window.bookAppointment = async function (teacherUid, teacherName) {
    try {
      const student = auth.currentUser;
      if (!student) return alert('Not signed in.');

      const reason = prompt(`Enter reason for appointment with ${teacherName}:`);
      if (!reason) return;

      const studentData = await getCurrentUserData();

      await addDoc(collection(db, 'appointments'), {
        teacherUid,
        teacherName,
        studentUid: student.uid,
        studentName: studentData?.name || '',
        reason,
        timestamp: new Date().toISOString(),
        status: 'pending'
      });

      await createLog(student.uid, 'student', 'book-appointment', `teacher:${teacherUid}`);
      alert('✅ Appointment request sent!');
      loadStudentAppointments();
    } catch (e) {
      console.error("bookAppointment error:", e);
      alert("Error booking appointment: " + (e.message || e.code));
    }
  };

  async function loadTeachersDropdown() {
    try {
      const select = document.getElementById('msg-teacher-select');
      if (!select) return;
      select.innerHTML = '<option value="">Select Teacher</option>';

      const snaps = await getDocs(collection(db, 'teachers'));
      if (snaps.empty) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'No teachers';
        select.appendChild(opt);
        return;
      }
      snaps.forEach(snap => {
        const t = snap.data();
        const opt = document.createElement('option');
        opt.value = snap.id;
        opt.textContent = `${t.name} (${t.dept || '—'})`;
        select.appendChild(opt);
      });
    } catch (e) {
      console.error("loadTeachersDropdown error:", e);
    }
  }

  async function sendMessage() {
    try {
      const teacherId = document.getElementById('msg-teacher-select').value;
      const subject = document.getElementById('msg-subject').value.trim();
      const body = document.getElementById('msg-body').value.trim();

      if (!teacherId || !subject || !body) return alert('Please fill all fields');

      const student = await getCurrentUserData();

      await addDoc(collection(db, 'messages'), {
        toTeacherUid: teacherId,
        fromStudentUid: auth.currentUser.uid,
        fromStudentName: student?.name || '',
        subject,
        body,
        timestamp: new Date().toISOString()
      });

      await createLog(auth.currentUser.uid, 'student', 'send-message', `to:${teacherId}`);
      alert('✅ Message sent!');
      document.getElementById('msg-subject').value = '';
      document.getElementById('msg-body').value = '';
    } catch (e) {
      console.error("sendMessage error:", e);
      alert("Error sending message: " + (e.message || e.code));
    }
  }

  async function loadStudentAppointments() {
    try {
      const div = document.getElementById('student-appointments');
      if (!div) return;
      div.innerHTML = 'Loading...';

      const uid = auth.currentUser && auth.currentUser.uid;
      if (!uid) {
        div.innerHTML = 'Not signed in.';
        return;
      }

      const q1 = query(collection(db, 'appointments'), where('studentUid', '==', uid));
      const q2 = query(collection(db, 'appointments'), where('studentId', '==', uid)); // backward compat
      const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      const map = new Map();
      snap1.forEach(s => map.set(s.id, s));
      snap2.forEach(s => map.set(s.id, s));

      div.innerHTML = '';
      if (!map.size) { div.innerHTML = "No appointments yet."; return; }

      map.forEach(docSnap => {
        const a = docSnap.data();
        const purpose = a.purpose || a.reason || "(No purpose given)";
        const time = a.dateTime || a.timestamp || a.createdAt || "";
        const teacherName = a.teacherName || a.teacher || "Teacher";
        const el = document.createElement('div');
        el.className = "appointment-box";
        el.innerHTML = `
          <strong>Teacher: ${teacherName}</strong><br>
          Purpose: ${purpose}<br>
          Time: ${time}<br>
          Status: ${a.status || 'pending'}
          <hr>
        `;
        div.appendChild(el);
      });
    } catch (e) {
      console.error("loadStudentAppointments error:", e);
      document.getElementById('student-appointments').innerHTML = 'Error loading appointments.';
    }
  }
};

// -------------------- TEACHER PAGE --------------------
window.initTeacherPage = function () {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      location.href = 'index.html';
      return;
    }

    const profile = await getCurrentUserData();
    if (!profile || profile.role !== 'teacher') {
      alert('Not authorized');
      await signOut(auth);
      location.href = 'index.html';
      return;
    }

    document.getElementById('teacher-logout')?.addEventListener('click', logoutAndRedirect);

    // initialize features
    await loadStudentsDropdown();
    await loadAppointments(profile);
    await loadMessages(profile);

    const scheduleBtn = document.getElementById('teacher-schedule-btn');
    if (scheduleBtn) scheduleBtn.addEventListener('click', () => scheduleAppointment(profile));
  });

  async function loadStudentsDropdown() {
    try {
      const sel = document.getElementById('student-select');
      if (!sel) return;
      sel.innerHTML = '<option value="">Select Student</option>';

      const q = query(
        collection(db, 'users'),
        where('role', '==', 'student'),
        where('approved', '==', true)
      );

      const snaps = await getDocs(q);
      if (snaps.empty) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'No students';
        sel.appendChild(opt);
        return;
      }
      snaps.forEach((snap) => {
        const s = snap.data();
        const opt = document.createElement('option');
        opt.value = snap.id;
        opt.textContent = `${s.name} (${s.email})`;
        sel.appendChild(opt);
      });
    } catch (e) {
      console.error("loadStudentsDropdown error:", e);
    }
  }

  async function scheduleAppointment(profile) {
    try {
      const studentId = document.getElementById('student-select').value;
      const dateTime = document.getElementById('teacher-appoint-date').value;
      const purpose = document.getElementById('teacher-appoint-purpose').value.trim();

      if (!studentId || !dateTime || !purpose) {
        alert('Please fill all fields.');
        return;
      }

      const studentSnap = await getDoc(doc(db, 'users', studentId));
      if (!studentSnap.exists()) {
        alert('Student not found!');
        return;
      }
      const student = studentSnap.data();

      await addDoc(collection(db, 'appointments'), {
        teacherUid: auth.currentUser.uid,
        teacherName: profile.name || '',
        studentUid: studentId,
        studentName: student.name || '',
        dateTime,
        purpose,
        status: 'approved',
        timestamp: new Date().toISOString()
      });

      await createLog(auth.currentUser.uid, 'teacher', 'schedule-appointment', `student:${studentId}`);
      alert('✅ Appointment scheduled!');
      loadAppointments(profile);
    } catch (e) {
      console.error("scheduleAppointment error:", e);
      alert("Error scheduling appointment: " + (e.message || e.code));
    }
  }

  async function loadAppointments(profile) {
  const div = document.getElementById('teacher-appointments');
  if (!div) return;
  div.innerHTML = 'Loading...';

  const uid = auth.currentUser.uid;

  try {
    const q = query(collection(db, 'appointments'), where('teacherUid', '==', uid));
    const snap = await getDocs(q);

    div.innerHTML = '';

    snap.forEach(docSnap => {
      const a = docSnap.data();

      const el = document.createElement('div');
      el.className = "appointment-box";
      el.innerHTML = `
        <strong>${a.studentName}</strong><br>
        Purpose: ${a.purpose || a.reason || '(No purpose)'}<br>
        Time: ${a.dateTime || a.timestamp || ''}<br>
        Status: ${a.status}<br>

        ${
          a.status === 'pending'
            ? `<button class="small-btn" onclick="teacherApprove('${docSnap.id}')">Approve</button>`
            : ''
        }

        <button class="small-btn" onclick="teacherCancel('${docSnap.id}')">Cancel</button>
        <hr>
      `;
      div.appendChild(el);
    });

    if (!div.innerHTML.trim()) div.innerHTML = 'No appointments yet.';
  } catch (err) {
    console.error("Teacher appt load error:", err);
    div.innerHTML = "Error loading appointments.";
  }
}


  // Expose approve/cancel globally
  window.teacherApprove = async function (appId) {
    try {
      await updateDoc(doc(db, 'appointments', appId), { status: 'approved' });
      await createLog(auth.currentUser.uid, 'teacher', 'approve-appointment', appId);
      // reload local view
      loadAppointments(await getCurrentUserData());
    } catch (e) {
      console.error("teacherApprove error:", e);
      alert("Approve error: " + (e.message || e.code));
    }
  };

  window.teacherCancel = async function (appId) {
    try {
      await updateDoc(doc(db, 'appointments', appId), { status: 'cancelled' });
      await createLog(auth.currentUser.uid, 'teacher', 'cancel-appointment', appId);
      loadAppointments(await getCurrentUserData());
    } catch (e) {
      console.error("teacherCancel error:", e);
      alert("Cancel error: " + (e.message || e.code));
    }
  };

  async function loadMessages(profile) {
    try {
      const div = document.getElementById('teacher-messages');
      if (!div) return;
      div.innerHTML = 'Loading...';

      const q1 = query(collection(db, 'messages'), where('toTeacherUid', '==', auth.currentUser.uid));
      const q2 = query(collection(db, 'messages'), where('teacherId', '==', auth.currentUser.uid));
      const [s1, s2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      const map = new Map();
      s1.forEach(s => map.set(s.id, s));
      s2.forEach(s => map.set(s.id, s));

      div.innerHTML = '';
      if (!map.size) { div.innerHTML = 'No messages yet.'; return; }

      map.forEach(snap => {
        const m = snap.data();
        const from = m.fromStudentName || m.fromStudentEmail || 'Student';
        const subj = m.subject || '';
        const body = m.body || m.message || '';
        const el = document.createElement('div');
        el.innerHTML = `<strong>From: ${from}</strong> — ${subj}<br>${body}<hr>`;
        div.appendChild(el);
      });
    } catch (e) {
      console.error("loadMessages error:", e);
      document.getElementById('teacher-messages').innerHTML = 'Error loading messages.';
    }
  }
};
