const validateNotificationDetails = (
  notificationTitle: string,
  notificationDescription: string,
  priority: string,
  categoryValue: string,
) => {
  const formErrors = {
    notificationTitle: '',
    notificationDescription: '',
    notificationPriority: '',
    notificationCategory: '',
  };

  // Validate Notification Title length
  const titleWords = notificationTitle
    .trim()
    .split(/\s+/)
    .filter((word) => word !== '');
  if (titleWords.length < 4 || titleWords.length > 10) {
    formErrors.notificationTitle =
      'Notification title must be between 4 and 10 words.';
  }

  // Validate Notification Description length
  const descriptionWords = notificationDescription
    .trim()
    .split(/\s+/)
    .filter((word) => word !== '');
  if (descriptionWords.length < 10 || descriptionWords.length > 50) {
    formErrors.notificationDescription =
      'Notification description must be between 10 and 50 words.';
  }

  // Validate Priority
  if (priority === '') {
    formErrors.notificationPriority = 'Please select a priority';
  }

  // Validate Category
  if (categoryValue === '') {
    formErrors.notificationCategory = 'Please select a category';
  }

  return formErrors;
};
export default validateNotificationDetails;
