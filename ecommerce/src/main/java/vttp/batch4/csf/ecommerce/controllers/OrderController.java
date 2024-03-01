package vttp.batch4.csf.ecommerce.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vttp.batch4.csf.ecommerce.Utils;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping(path="/api", consumes = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path="/order")
  @ResponseBody
  public ResponseEntity<String> postOrder(
    @RequestParam String name,
    @RequestParam String address,
    @RequestParam Boolean priority,
    @RequestParam(required=false) String comments,
    @RequestParam String cart
  ) {

    // TODO Task 3
    Order order = new Order();
    order.setName(name);
    order.setAddress(address);
    order.setPriority(priority);
    order.setComments(comments);
    
    List<LineItem> lineItems = new ArrayList<>();
    String[] items = cart.split(",");
    
    for (String item : items) {
      LineItem lineItem = new LineItem();
      lineItem.setProductId(item.split(":")[0]);
      lineItem.setName(item.split(":")[1]);
      lineItem.setQuantity(Integer.parseInt(item.split(":")[2]));
      lineItem.setPrice(Float.parseFloat(item.split(":")[3]));
      lineItems.add(lineItem);
    }
    
    order.getCart().setLineItems(lineItems);
    
    String result = poSvc.createNewPurchaseOrder(order);
    if (result != null && !result.isEmpty()) {
      return ResponseEntity.ok(Utils.returnOrderId(result).toString());
    }
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .build();
  }
}
