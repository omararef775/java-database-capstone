import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + '/doctor';

export async function getDoctors() {
    try {
        const response = await fetch(DOCTOR_API);
        if (response.ok) {
            return await response.json();
        }
        return [];
    } catch (error) {
        return [];
    }
}

export async function deleteDoctor(id, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return { success: true, message: 'تم حذف الطبيب بنجاح' };
        }
        return { success: false, message: 'فشل في حذف الطبيب' };
    } catch (error) {
        return { success: false, message: 'حدث خطأ في الاتصال بالخادم' };
    }
}

export async function saveDoctor(doctor, token) {
    try {
        const response = await fetch(DOCTOR_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        if (response.ok) {
            return { success: true, message: 'تم إضافة الطبيب بنجاح' };
        }
        return { success: false, message: 'فشل في إضافة الطبيب' };
    } catch (error) {
        return { success: false, message: 'حدث خطأ في الاتصال بالخادم' };
    }
}

export async function filterDoctors(name, time, specialty) {
    try {
        const params = new URLSearchParams();
        if (name) params.append("name", name);
        if (time) params.append("time", time);
        if (specialty) params.append("specialty", specialty);

        const url = `${DOCTOR_API}/filter?${params.toString()}`;

        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
        return [];
    } catch (error) {
        alert("حدث خطأ أثناء تصفية الأطباء");
        return [];
    }
}