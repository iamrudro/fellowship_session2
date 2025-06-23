function validateSubscriber(data) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
        return false;
    }

    if (!data.subedToChannel || typeof data.subedToChannel !== 'string' || data.subedToChannel.trim() === '') {
        return false;
    }

    if (!data.email || typeof data.email !== 'string' || data.email.trim() === '') {
    return false;
  }
}

module.exports = { validateSubscriber };
