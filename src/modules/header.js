function createHeader(){
    const header = document.createElement('div');
    header.classList.add("header");

    const headerContent = document.createElement('div');
    headerContent.classList.add("header-content");
    headerContent.textContent = "Weather App";

    header.append(headerContent);
    document.body.append(header);
}

export default createHeader;