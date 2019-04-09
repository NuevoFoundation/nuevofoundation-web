export class Const {
  public static RootPage: string = "/";
  public static WhatWeDoPage: string = "/what-we-do";
  public static AboutUsPage: string = "/about-us";
  public static SupportUsPage: string = "/support-us";
  public static BlogPage: string = "/blog";
  public static BlogPost: string = "/blog/post/:id";
  public static FaqPage: string = "/faq";
  public static ContactPage: string = "/contact";

  public static SkypeInClassroomPage: string = "/"; // TODO: Update this link to Skype in Classroom
  public static PayPalDonatePage?: string = process.env.REACT_APP_PAYPAL_DONATE;
  public static WordpressEndpoint?: string =
  process.env.REACT_APP_WORDPRESS_ENDPOINT;
  public static GoogleAnalyticsTrackingId?: string = process.env.REACT_APP_GA_ID;
}
