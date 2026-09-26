function renderFooter() {
    const footer = document.getElementById("footer");

    if (!footer) return;

    footer.innerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-brand">
                    <h4>نظام إدارة العيادة الذكية</h4>
                    <p>© 2026 جميع الحقوق محفوظة.</p>
                </div>
                <div class="footer-links">
                    <div class="footer-column">
                        <h5>الشركة</h5>
                        <a href="#">من نحن</a>
                        <a href="#">وظائف</a>
                        <a href="#">صحافة</a>
                    </div>
                    <div class="footer-column">
                        <h5>الدعم</h5>
                        <a href="#">حسابي</a>
                        <a href="#">مركز المساعدة</a>
                        <a href="#">اتصل بنا</a>
                    </div>
                    <div class="footer-column">
                        <h5>القوانين</h5>
                        <a href="#">الشروط والأحكام</a>
                        <a href="#">سياسة الخصوصية</a>
                        <a href="#">التراخيص</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

renderFooter();