export class Const {
  public static RootPage: string = "/";
  public static WhatWeDoPage: string = "/what-we-do";
  public static AboutUsPage: string = "/about-us";
  public static SupportUsPage: string = "/support-us";
  public static BlogPage: string = "/blog";
  public static BlogPost: string = "/blog/post/:id";
  public static FaqPage: string = "/faq";
  public static ContactPage: string = "/contact";
  public static SchoolWorkshopPage: string = "/workshops";
  public static VirtualSessionPage: string = "/virtual-sessions"; // TODO: Update this link to what we do page

  public static PayPalDonatePage?: string = process.env.REACT_APP_PAYPAL_DONATE;
  public static WordpressEndpoint?: string =
  process.env.REACT_APP_WORDPRESS_ENDPOINT;
  public static ApiEndpoint?: string =
  process.env.REACT_APP_API_URL;
  public static GoogleAnalyticsTrackingId?: string = process.env.REACT_APP_GA_ID;
  public static BlogPageSize: number = 10;
}
