
// src/analytics.ts

/**
 * Интерфейс для любого аналитического трекера.
 * Каждый трекер должен иметь метод track.
 */
interface AnalyticsTracker {
  track(eventName: string, data: Record<string, any>): void;
}

/**
 * Фейковый трекер для Google Analytics.
 * В реальном проекте здесь будет код для отправки данных в Google.
 */
class GoogleAnalyticsTracker implements AnalyticsTracker {
  track(eventName: string, data: Record<string, any>) {
    console.log(`[Google Analytics] Event: ${eventName}`, data);
    // Например, window.gtag('event', eventName, data);
  }
}

/**
 * Фейковый трекер для Facebook Pixel.
 */
class FacebookPixelTracker implements AnalyticsTracker {
  track(eventName: string, data: Record<string, any>) {
    console.log(`[Facebook Pixel] Event: ${eventName}`, data);
    // Например, window.fbq('track', eventName, data);
  }
}

/**
 * Фейковый трекер для TikTok.
 */
class TikTokTracker implements AnalyticsTracker {
    track(eventName: string, data: Record<string, any>) {
        console.log(`[TikTok] Event: ${eventName}`, data);
        // Например, window.ttq.track(eventName, data);
    }
}


/**
 * Сервис аналитики, который управляет всеми трекерами.
 */
class AnalyticsService {
  private trackers: AnalyticsTracker[] = [];

  /**
   * Регистрирует новый трекер в системе.
   * @param tracker - Экземпляр трекера.
   */
  register(tracker: AnalyticsTracker) {
    this.trackers.push(tracker);
  }

  /**
   * Отправляет событие во все зарегистрированные трекеры.
   * @param eventName - Название события (например, 'change_quantity').
   * @param data - Данные, связанные с событием.
   */
  track(eventName: string, data: Record<string, any>) {
    for (const tracker of this.trackers) {
      tracker.track(eventName, data);
    }
  }
}

// Создаем и экспортируем единый экземпляр (синглтон) сервиса аналитики.
const analyticsService = new AnalyticsService();

// Регистрируем нужные нам трекеры.
// В реальном приложении это можно делать в зависимости от настроек.
analyticsService.register(new GoogleAnalyticsTracker());
analyticsService.register(new FacebookPixelTracker());
analyticsService.register(new TikTokTracker());

export default analyticsService;
