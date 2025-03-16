export const navItems = [
    {
      name: "Главная",
      icon: "/assets/icons/dashboard.svg",
      url: "/",
    },
    {
      name: "Документы",
      icon: "/assets/icons/documents.svg",
      url: "/documents",
    },
    {
      name: "Картинки",
      icon: "/assets/icons/images.svg",
      url: "/images",
    },
    {
      name: "Медиа",
      icon: "/assets/icons/video.svg",
      url: "/media",
    },
    {
      name: "Другое",
      icon: "/assets/icons/others.svg",
      url: "/others",
    },
  ];
  
  export const actionsDropdownItems = [
    {
      label: "Переименовать",
      icon: "/assets/icons/edit.svg",
      value: "rename",
    },
    {
      label: "Подробнее",
      icon: "/assets/icons/info.svg",
      value: "details",
    },
    {
      label: "Поделиться",
      icon: "/assets/icons/share.svg",
      value: "share",
    },
    {
      label: "Скачать",
      icon: "/assets/icons/download.svg",
      value: "download",
    },
    {
      label: "Удалить",
      icon: "/assets/icons/delete.svg",
      value: "delete",
    },
  ];
  
  export const sortTypes = [
    {
      label: "Новые",
      value: "$createdAt-desc",
    },
    {
      label: "Старые",
      value: "$createdAt-asc",
    },
    {
      label: "По алфавиту",
      value: "name-asc",
    },
    {
      label: "Против алфавита",
      value: "name-desc",
    },
    {
      label: "Тяжелые",
      value: "size-desc",
    },
    {
      label: "Легкие",
      value: "size-asc",
    },
  ];
  
  export const avatarPlaceholderUrl =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";
  
  export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB